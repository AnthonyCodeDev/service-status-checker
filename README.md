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


### ![Français](https://flagcdn.com/20x15/fr.png) Français

Un script Python permettant de vérifier le statut de disponibilité d’un service via downforeveryoneorjustme.com.

###  Installation & Utilisation
#### 1️⃣ Installer les dépendances nécessaires
Assurez-vous d’installer les bibliothèques Python requises :

```bash
pip install beautifulsoup4 cloudscraper groq
```

#### 2️⃣ Configurer et exécuter le script
Modifiez le `service_name` et la `groq_api_key` dans le script, puis lancez :

```bash
python service_status_checker.py
```
