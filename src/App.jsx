import { useState, useEffect } from 'react'; 
import './App.scss';
import Titlebar from './components/Titlebar/Titlebar';
import Calendar from './components/Calendar/Calendar';
import { fetchCalendarData } from './api';

// Déclaration du composant principal App
function App() {
// Déclaration des états locaux :
    // - `calendar` : Contient les données du calendrier récupérées depuis Firestore.
    // - `showAll` : Indique si tous les éléments du calendrier doivent être affichés.
    const [docId, setDocId] = useState(null);
    const [calendar, setCalendar] = useState(null);
    const [showAll, setShowAll] = useState(false);

    // Fonction exécutée lorsque la page est chargée
    const dataLayerPushView = (calendarDoc) => {
      const iframeId = "storytelling_CAL_" + calendarDoc;
      //console.log(iframeId); // Vous pouvez remplacer par une autre action
      window.blickDataLayer.push({
        event: "iframe_click",
        iframe_name: iframeId,
        iframe_id: "iframe_see_all_clicked"
      });
    };

    useEffect(() => {
        

        const urlParams = new URLSearchParams(window.location.search);
        const calendarDoc = urlParams.get('calendarDoc'); // Récupère la valeur du paramètre `calendarDoc`.

        if (!calendarDoc) {
            console.log('Aucun calendrier trouvé.');
            return;
        }

        
        dataLayerPushView(calendarDoc); // Appeler la fonction `dataLayerPushView` lorsque la page est chargée
        setDocId(calendarDoc); // Met à jour l'état `docId` avec la valeur de calendarDoc

// Fonction asynchrone pour charger les données du calendrier depuis Firestore.
        async function loadCalendar() {
            const data = await fetchCalendarData(calendarDoc); // Appel à l'API pour récupérer les données.
            setCalendar(data); // Mise à jour de l'état `calendar` avec les données récupérées.
        }

        loadCalendar();
    }, []); // Le tableau de dépendances vide signifie que cet effet est exécuté une seule fois.

    const handleSeeAllClick = () => {
        setShowAll(true); // Met à jour l'état `showAll` pour afficher tous les éléments du calendrier.
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
