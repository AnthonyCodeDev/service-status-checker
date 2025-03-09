# Service Status Checker

## ![English](https://flagcdn.com/20x15/gb.png) English

A Python script that checks the availability status of a service using **downforeveryoneorjustme.com**. It bypasses Cloudflare protections, scrapes the website for service status, and translates messages into French using the **Groq API**.

### Installation & Usage
#### 1️⃣ Install Required Dependencies
Ensure you have the required Python packages installed:
```bash
pip install beautifulsoup4 cloudscraper groq
```

#### 2️⃣ Configure & Run the Script
Modify the `service_name` and `groq_api_key` in the script and run:

```bash
python service_status_checker.py
```

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
