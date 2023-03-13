import sys
import re
from bs4 import BeautifulSoup
from translate import GoogleTranslator


translator = GoogleTranslator(options="")
elements = ["span", "p", "a", "h1", "h2", "h3", "h4", "h5", "strong", "i"]
ignoreText = set([
    "Class Central",
])


def translateBulk(strings: list[str], originLanguage="en", destinationLanguage="hi"):
    translator.translate(strings, originLanguage, destinationLanguage)


def translateContent(element, originLanguage="en", destinationLanguage="hi"):
    strippedString = str(element.string).strip()
    regexPatternStrippedString = re.compile(f'({re.escape(strippedString)})')

    translation = translator.translate(strippedString, originLanguage, destinationLanguage)
    print(translation)

    content = element.find(string=regexPatternStrippedString)
    content.replaceWith(translation[strippedString])


def loadBulkToTranslate():
    textList = []

    def appendToTextList(element) -> None:
        string = str(element.string).strip()
        textList.append(string)

    findContent(appendToTextList)
    translateBulk(textList)


def findContent(func):
    for elementToFind in elements:
        for element in soup.findAll(elementToFind):

            strippedString = str(element.string).strip()

            if element.string == None:
                continue

            if strippedString in ignoreText:
                continue

            if strippedString == "":
                continue

            func(element)


def translateContentAfterBulkTranslation():
    findContent(translateContent)

htmlPath = "/home/anaeru/repositories/personal/scrapper-translate-classcenter/httrack-output/www.classcentral.com/index.html" # sys.argv[1]

with open(htmlPath, "r") as file:
    html = file.read()

soup = BeautifulSoup(html, "html.parser")
soup.smooth()

loadBulkToTranslate()
translateContentAfterBulkTranslation()

with open("test1.html", "wb") as file:
    file.write(soup.prettify("utf-8"))

# with open(htmlPath, "wb") as file:
#     file.write(soup.prettify("utf-8"))
