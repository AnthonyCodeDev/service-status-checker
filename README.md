# Service Status Checker

## ![English](https://flagcdn.com/20x15/gb.png) English

A Python script that checks the availability status of a service using **downforeveryoneorjustme.com**. It bypasses Cloudflare protections, scrapes the website for service status, and translates messages into French using the **Groq API**.

### Installation & Usage
#### 1️⃣ Install Required Dependencies
Ensure you have the required Python packages installed:
```bash
pip install beautifulsoup4 cloudscraper groq flask
```

#### 2️⃣ Run the Script
There are two ways to use this script:

- **For quick testing:** Run `main.py` directly.
- **For deploying on a server:** Start `server-backend.py`, which will listen on port `5000`.

##### ▶️ Quick Test (Run main.py)
If you just want to test the script locally, modify the `service_name` and `groq_api_key` in `main.py`, then run:
```bash
python main.py
```

##### 🌐 Deploy as a Server (Run server-backend.py)
To set up a backend API for checking service status, start the Flask server:
```bash
python server-backend.py
```
By default, the server will listen on **port 5000**.

You can then make API requests like:
```bash
curl "http://localhost:5000/check_status/google?language=fr"
```
This will return the service status of **Google** in French.

---
This project also includes an **Alexa Skill (alexa_skill.js)** to check service statuses via voice commands using an API.
  
  <br>
  
## ![Français](https://flagcdn.com/20x15/fr.png) Français

Un script Python qui vérifie l'état de disponibilité d'un service en utilisant **downforeveryoneorjustme.com**. Il contourne les protections Cloudflare, récupère le statut du service et traduit les messages en français grâce à l'**API Groq**.

### Installation & Utilisation
#### 1️⃣ Installer les dépendances requises
Assurez-vous d'avoir les packages Python nécessaires installés :
```bash
pip install beautifulsoup4 cloudscraper groq flask
```

#### 2️⃣ Exécuter le script
Il existe deux façons d'utiliser ce script :

- **Pour un test rapide :** Exécutez `main.py` directement.
- **Pour le déployer sur un serveur :** Lancez `server-backend.py`, qui écoutera sur le port `5000`.

##### ▶️ Test rapide (Exécuter main.py)
Si vous souhaitez simplement tester le script en local, modifiez `service_name` et `groq_api_key` dans `main.py`, puis exécutez :
```bash
python main.py
```

##### 🌐 Déploiement sur un serveur (Exécuter server-backend.py)
Pour configurer une API backend permettant de vérifier le statut des services, démarrez le serveur Flask :
```bash
python server-backend.py
```
Par défaut, le serveur écoutera sur **le port 5000**.

Vous pouvez ensuite effectuer des requêtes API comme :
```bash
curl "http://localhost:5000/check_status/google?language=fr"
```
Cela retournera l'état du service **Google** en français.

---
Ce projet inclut également une **compétence Alexa (alexa_skill.js)** permettant de vérifier le statut des services par commande vocale via une API.

