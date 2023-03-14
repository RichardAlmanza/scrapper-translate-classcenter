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
    _refTexts = {}
    _keyClassNameToGetTranslations = "ryNqvb"
    _translatorURL = "https://translate.google.com/"
    _regexPatternTranslation = re.compile("^(MSI\d+H): (.+)")
    _patternCheck = re.compile("^(MSI\d+H):")




    def __init__(self, options: Union[str, list[str]] = "--headless", timeout: int = 10):
        # self.load()

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


    def load(self) -> bool:
        try:
            with open("GoogleTranslatorObject", "rb") as f:
                pack = pickle.load(f)
                self._textId = pack[0]
                self._texts = pack[1]
                self._translations = pack[2]
                self._refTexts = pack[3]

            return True

        except FileNotFoundError:
            return False


    def _addTextsToTranslate(self, textsToTranslate: list[str]) -> list[str]:
        textListToTranslate = []

        for text in textsToTranslate:
            if text not in self._texts:
                textListToTranslate.append(f'MSI{self._textId}H: {text}')
                self._texts[text] = f'MSI{self._textId}H'
                self._refTexts[f'MSI{self._textId}H'] = text
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
        lastRef = ""

        for element in elements:
            translation = str(element.string)

            if translation.strip() == "":
                continue

            if self._patternCheck.match(translation) == None:
                self._translations[lastRef] = f"{self._translations[lastRef]}{translation}"
                continue

            translation = self._regexPatternTranslation.findall(translation)[0]

            self._translations[translation[0]] = translation[1]
            lastRef = translation[0]


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


    def _createChucks(self, textsToTranslate: list[str]) -> list[list[str]]:
        textChunks = []
        tempList= []
        counter = 0

        for text in textsToTranslate:
            if counter + len(text) > self._chunkSizeForTranslations:
                textChunks.append(tempList)
                tempList = []
                counter = 0

            tempList.append(text)
            counter += len(text)

        textChunks.append(tempList)

        return textChunks


    def save(self):
        try:
            with open("GoogleTranslatorObject", "wb") as f:
                pack = [
                    self._textId,
                    self._texts,
                    self._translations,
                    self._refTexts,
                ]
                pickle.dump(pack, f)

        except FileNotFoundError:
            pass

    def translate(self, textsToTranslate: Union[str, list[str]], sourceLanguage: str = "en",
                  destinationLanguage: str = "hi") -> dict[str, str]:

        if type(textsToTranslate) == str:
            textsToTranslate = [textsToTranslate]

        newTextsToTranslate = self._addTextsToTranslate(textsToTranslate)
        textChucks = self._createChucks(newTextsToTranslate)

        for textChuck in textChucks:
            if textChuck == []:
                continue

            url = self._getUrlForTranslation("\n".join(textChuck), sourceLanguage, destinationLanguage)
            self._driver.get(url)

            translations = self._getResponse()
            self._saveTranslations(translations)

        # self.save()
        return self._returnTranslations(textsToTranslate)


