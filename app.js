const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware pour vérifier les heures de travail
const checkWorkingHours = (req, res, next) => {
    const currentDate = new Date();
    const day = currentDate.getDay(); // 0 = dimanche, 6 = samedi
    const hour = currentDate.getHours();
    
    // Vérifie si c'est un jour de semaine (1-5) et entre 9h et 17h
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Continue à la route
    } else {
        res.send('L\'application est disponible uniquement pendant les heures de travail.');
    }
};

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Configuration du moteur de template
app.set('view engine', 'ejs');

// Routes
app.get('/', checkWorkingHours, (req, res) => {
    res.render('index');
});

app.get('/services', checkWorkingHours, (req, res) => {
    res.render('services');
});

app.get('/contact', checkWorkingHours, (req, res) => {
    res.render('contact');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

