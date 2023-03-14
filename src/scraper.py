import sys
import re
from bs4 import BeautifulSoup
from bs4.element import Comment, Doctype, NavigableString, Tag
from translate import GoogleTranslator

translator = GoogleTranslator()
wordRe = re.compile("[(\w+)(\d+)]")
attributesToTranslate = set(["placeholder", "aria-label", "alt"])
tagsToIgnore = set(["script","style","svg","link"])
typesToIgnore = set([Comment, Doctype])
ignoreText = set([
    "Class Central",
])


def translateBulk(strings: list[str], originLanguage="en", destinationLanguage="hi"):
    translator.translate(strings, originLanguage, destinationLanguage)


def translateContent(element, originLanguage="en", destinationLanguage="hi"):
    strippedString = str(element.string).strip()
    regexPatternStrippedString = re.compile(f'({re.escape(strippedString)})')

    translation = translator.translate(strippedString, originLanguage, destinationLanguage)

    if type(element) == NavigableString:
        element.replaceWith(translation[strippedString])
    else:
        content = element.find(string=regexPatternStrippedString)
        content.replaceWith(translation[strippedString])


def loadBulkToTranslate(parentElement):
    textList = []

    def appendToTextList(element) -> None:
        string = str(element.string).strip()
        textList.append(string)

    findContent(appendToTextList, parentElement)
    translateBulk(textList)


def translateAttributes(func, element, attr):
    if wordRe.match(element[attr]) == None:
        return

    if func != translateContent:
        func(NavigableString(element[attr]))
    else:
        translation = translator.translate(element[attr], "en", "hi")
        element[attr] = translation[element[attr]]


def findContent(func, parentElement):
    for element in parentElement.children:

        strippedString = str(element.string).strip()

        if type(element) in typesToIgnore:
            continue

        if element.name in tagsToIgnore:
            continue

        if type(element) == Tag:
            for attr in attributesToTranslate:
                if attr in element.attrs:
                    translateAttributes(func, element, attr)

        if element.string == None:
            if element.contents != []:
                findContent(func, element)
            continue

        if strippedString in ignoreText:
            continue

        if wordRe.match(strippedString) == None:
            continue

        func(element)


def translateContentAfterBulkTranslation(parentElement):
    findContent(translateContent, parentElement)


htmlPath = sys.argv[1]

with open(htmlPath, "r") as file:
    html = file.read()

soup = BeautifulSoup(html, "lxml")
soup.smooth()

loadBulkToTranslate(soup)
translateContentAfterBulkTranslation(soup)

with open(htmlPath, "wb") as file:
    file.write(soup.prettify("utf-8"))
