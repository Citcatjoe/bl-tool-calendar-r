import { useState, useEffect } from 'react'; 
import './App.scss';
import Titlebar from './components/Titlebar/Titlebar';
import Calendar from './components/Calendar/Calendar';
import { fetchCalendarData } from './services/api';
import { dataLayerPushView, dataLayerPushSeeAllClick } from './services/analytics'; // Import des fonctions analytiques

// Déclaration du composant principal App
function App() {
// Déclaration des états locaux :
    // - `calendar` : Contient les données du calendrier récupérées depuis Firestore.
    // - `showAll` : Indique si tous les éléments du calendrier doivent être affichés.
    const [docId, setDocId] = useState(null);
    const [calendar, setCalendar] = useState(null);
    const [showAll, setShowAll] = useState(false);

    // Fonction exécutée lorsque la page est chargée
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const calendarDoc = urlParams.get('calendarDoc'); // Récupère la valeur du paramètre `calendarDoc`.

        if (!calendarDoc) {
            console.log('Aucun calendrier trouvé.');
            return;
        }

        dataLayerPushView(calendarDoc); // Appeler la fonction déplacée
        setDocId(calendarDoc); // Met à jour l'état `docId` avec la valeur de calendarDoc

        async function loadCalendar() {
            const data = await fetchCalendarData(calendarDoc); // Appel à l'API pour récupérer les données.
            setCalendar(data); // Mise à jour de l'état `calendar` avec les données récupérées.
        }

        loadCalendar();
    }, []); // Le tableau de dépendances vide signifie que cet effet est exécuté une seule fois.

    const handleSeeAllClick = () => {
        setShowAll(true); // Met à jour l'état `showAll`
        dataLayerPushSeeAllClick(docId); // Appel de la fonction analytique
    };

    return (
        <div className="App relative">
            <Titlebar calName={calendar?.calName} />
            <Calendar
                calendar={calendar}
                docId={docId} // Passe l'ID du document directement
                showAll={showAll}
                onSeeAllClick={handleSeeAllClick}
            />
        </div>
    );
}

export default App;
