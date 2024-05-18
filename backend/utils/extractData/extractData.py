import cv2
import pytesseract
import re
from pytesseract import Output
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
def extractDataFromInvoice(image_path,type):
    image = cv2.imread(image_path)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    custom_config = r'-l ron --oem 3 --psm 6'
    text = pytesseract.image_to_string(gray_image, config=custom_config)

    if type=="Engie_gaz":
        matches = re.findall(r'DATA SCADENTĂ\s*\n\s*(\d+,\d+)', text)
    elif type=="EON_curent" or type=="Hidroelectrica_curent":
        matches = re.findall(r'(\d+,\d+)\s*kWh', text)
    elif type=="Enel_curent":
        matches = re.findall(r'Consum energie activă kWh (\d+)', text)

    if matches:
        print(f"Cantitatea facturată de gaze naturale este: {matches[0]} kWh")
        return matches[0]
    else:
        print("Cantitatea de kWh consumați nu a putut fi găsită în textul extras.")
        return None

#extracted_data = extractDataFromInvoice('EnelCurent.png', "Enel_curent")

# extracted_data = extractDataFromInvoice('EngieGaz.png', "Engie_gaz")

# extracted_data = extractDataFromInvoice('EonCurent.png', "EON_curent")

#extracted_data = extractDataFromInvoice('HidroelectricaCurent.png', "Hidroelectrica_curent")


