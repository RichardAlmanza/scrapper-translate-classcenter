import time
import re
import pickle
from typing import Union
from urllib.parse import quote as urlEncode
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

class GoogleTranslator():
    _chunkSizeForTranslations = 4000 # Google's limit is 5000 characters
    _textId = 0
    _texts = {}
    _translations = {}
    _keyClassNameToGetTranslations = "ryNqvb"
    _translatorURL = "https://translate.google.com/"


    def __init__(self, options: Union[str, list[str]] = "--headless", timeout: int = 10):
        try:
            with open("GoogleTranslatorObject", "rb") as f:
                pack = pickle.load(f)
                self._textId = pack[0]
                self._texts = pack[1]
                self._translations = pack[2]

        except FileNotFoundError:
            pass

        if type(options) == str:
            options = [options]

        self.timeout = timeout
        self._chromeOptions = Options()

        for option in options:
            if option == "":
                continue

            self._chromeOptions.add_argument(option)

        self._driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=self._chromeOptions)
        self._driver.get(self._translatorURL)


    def _addTextsToTranslate(self, textsToTranslate: list[str]) -> list[str]:
        textListToTranslate = []

        for text in textsToTranslate:
            if text not in self._texts:
                textListToTranslate.append(f'X{self._textId}: "{text}"')
                self._texts[text] = str(self._textId)
                self._textId += 1

        return textListToTranslate


    def _getResponse(self) -> any:
        elements = []
        counter = 0.0
        waitingTime = 0.3

        while elements == []:
            if counter >= self.timeout:
                break

            time.sleep(waitingTime)
            counter += waitingTime

            soup = BeautifulSoup(self._driver.page_source, "lxml")
            elements = soup.findAll("span", {"class": self._keyClassNameToGetTranslations})

        return elements


    def _saveTranslations(self, elements) -> None:
        regexPatternTranslation = re.compile("^X(\d+): \"(.+)\"?")

        for element in elements:
            translation = str(element.string)

            if translation.strip() == "":
                continue

            translation = regexPatternTranslation.findall(translation)[0]

            self._translations[translation[0]] = translation[1]


    def _getUrlForTranslation(self, textToTranslate, sourceLanguage: str, destinationLanguage: str) -> str:
        return (
            f'{self._translatorURL}?'
            f'sl={sourceLanguage}&tl={destinationLanguage}&'
            f'text={urlEncode(textToTranslate)}&op=translate'
        )


    def _returnTranslations(self, textsToTranslate: list[str]) -> dict[str, str]:
        results = {}

        for text in textsToTranslate:
            results[text] = self._translations[self._texts[text]]

        return results


    def _createChucks(self, textsToTranslate: str) -> list[str]:
        textChunks = []

        pointerStart = 0
        lastIndex = 0
        index = 0
        offset = 0

        try:
            while True:
                while index - offset < self._chunkSizeForTranslations:
                    lastIndex = index + 1
                    index = textsToTranslate.index("\n", lastIndex)

                textChunks.append(textsToTranslate[pointerStart:lastIndex - 1])
                pointerStart = lastIndex
                lastIndex = pointerStart
                offset = pointerStart

        except ValueError:
            textChunks.append(textsToTranslate[pointerStart:])

        return textChunks


    def save(self):
        try:
            with open("GoogleTranslatorObject", "wb") as f:
                pack = [
                    self._textId,
                    self._texts,
                    self._translations
                ]
                pickle.dump(pack, f)

        except FileNotFoundError:
            pass

    def translate(self, textsToTranslate: Union[str, list[str]], sourceLanguage: str = "en",
                  destinationLanguage: str = "hi") -> dict[str, str]:

        if type(textsToTranslate) == str:
            textsToTranslate = [textsToTranslate]

        newTextsToTranslate = self._addTextsToTranslate(textsToTranslate)
        joinedTextToTranslate = "\n".join(newTextsToTranslate)
        textChucks = self._createChucks(joinedTextToTranslate)

        for textChuck in textChucks:
            if textChuck != "":
                url = self._getUrlForTranslation(textChuck, sourceLanguage, destinationLanguage)
                self._driver.get(url)

                translations = self._getResponse()
                self._saveTranslations(translations)

        self.save()
        return self._returnTranslations(textsToTranslate)


