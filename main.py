import time
import random
from bs4 import BeautifulSoup
import cloudscraper  # Pour contourner Cloudflare
from groq import Groq  # Assurez-vous que le package groq est installé

# Clé API Groq (mettez votre propre clé ici)
groq_api_key = "gsk_xxx"

# Classe de vérification du statut d'un service via downforeveryoneorjustme.com
class ServiceStatusChecker:
    def __init__(self, service_name="chatgpt"):
        self.service_name = service_name  # Nom du service
        self.url = f"https://downforeveryoneorjustme.com/{self.service_name}"
        self.scraper = cloudscraper.create_scraper(
            browser={
                'browser': 'chrome',
                'platform': 'windows',
                'desktop': True
            },
            delay=5
        )
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": "https://www.google.com/search?q=is+chatgpt+down",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "cross-site",
            "Sec-Fetch-User": "?1",
            "sec-ch-ua": "\"Chromium\";v=\"122\", \"Microsoft Edge\";v=\"122\", \"Not:A-Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "Cache-Control": "max-age=0",
            "Priority": "u=0, i",
        }
    
    def fetch_page(self):
        try:
            # Visite préalable du site principal pour contourner Cloudflare
            self.scraper.get("https://downforeveryoneorjustme.com/", headers=self.headers)
            # Ajout de paramètres aléatoires pour éviter le cache
            timestamp = int(time.time())
            url_with_param = f"{self.url}?t={timestamp}&r={random.randint(1000, 9999)}"
            response = self.scraper.get(url_with_param, headers=self.headers, timeout=20)
            if response.status_code == 200:
                return response.text
            else:
                return None
        except Exception:
            return None
    
    def check_status(self):
        html_content = self.fetch_page()
        if not html_content:
            return {"status": "unknown", "message": ""}
        
        soup = BeautifulSoup(html_content, 'html.parser')
        message = ""
        
        # Détermination de l'état en fonction du contenu HTML
        if "Yes, we are detecting problems with" in html_content and self.service_name in html_content:
            status = "down"
        elif "No, we are not detecting any problems with" in html_content and self.service_name in html_content:
            status = "up"
        else:
            # Recherche des anciennes divs en cas d'absence des messages textuels attendus
            green_div = soup.find("div", class_=lambda c: c and "text-green-900" in c and "bg-green-300" in c)
            red_div = soup.find("div", class_=lambda c: c and "text-red-900" in c and "bg-red-300" in c)
            if green_div:
                status = "up"
            elif red_div:
                status = "down"
            else:
                status = "unknown"
        
        # Extraction du message selon l'état (div avec classes spécifiques)
        if status == "down":
            msg_div = soup.find("div", class_=lambda c: c and "text-red-900/70" in c)
        elif status == "up":
            msg_div = soup.find("div", class_=lambda c: c and "text-green-900/70" in c)
        else:
            msg_div = None
        
        if msg_div:
            message = msg_div.get_text(strip=True)
        
        return {"status": status, "message": message}

# Fonction pour traduire un message en français via l'API Groq
def translate_to_french(english_message):
    prompt = f"Traduis en français le message suivant : '{english_message}'"
    client = Groq(api_key=groq_api_key)
    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama3-8b-8192"
    )
    # Extraction du contenu traduit depuis la réponse
    french_message = chat_completion['choices'][0]['message']['content']
    return french_message

if __name__ == "__main__":
    # Exemple d'utilisation
    checker = ServiceStatusChecker(service_name="chatgpt")  # Vous pouvez changer le service ici
    result = checker.check_status()
    
    # Si un message est récupéré, on le traduit en français
    if result["message"]:
        result["message"] = translate_to_french(result["message"])
    
    status_text = "Up" if result["status"] == "up" else "Down" if result["status"] == "down" else "Unknown"
    print(f"{checker.url}: {status_text}\nMessage en français: {result['message']}")
