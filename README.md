# BasketTourney Manager 

Questa è un'applicazione di gestione dei tornei di Basket! Questa applicazione è stata sviluppata utilizzando Next.js e offre una serie di funzionalità per gestire un torneo di Basket in modo efficace.

## Funzionalità

- **Login**: Accedi all'area riservata come amministratore per accedere alle funzionalità avanzate dell'applicazione.

- **Gestione delle Squadre**: Solo gli amministratori possono aggiungere nuove squadre e i relativi giocatori. Ogni giocatore può essere assegnato a una specifica squadra al momento dell'aggiunta al database.

- **Visualizzazione Dettaglio Squadra**: Gli utenti possono visualizzare i dettagli di ogni singola squadra, inclusi l'allenatore e i giocatori che ne fanno parte.

- **Gestione dei Punteggi**: L'applicazione offre un sistema per gestire i punteggi delle partite, seguendo le logiche tipiche del basket.

## Tecnologie Utilizzate

- **Next.js**: Il framework React utilizzato per lo sviluppo dell'applicazione. Le API di Next.js verranno utilizzate anche per la parte backend dell'applicazione.

- **MySQL**: Il database utilizzato per memorizzare tutte le informazioni relative alle squadre, ai giocatori e ai punteggi delle partite è MySQL.

## Configurazione

Per configurare correttamente l'applicazione, è necessario seguire i seguenti passaggi:

1. Assicurati di avere installato Node.js e npm sul tuo sistema.
2. Clona questo repository sul tuo computer.
3. Installa tutte le dipendenze utilizzando il comando `npm install`.
4. Configura il database MySQL, assicurandoti di avere un database creato con le tabelle necessarie per memorizzare le informazioni sulle squadre, i giocatori e i punteggi.
5. Modifica il file `.env` per configurare le variabili d'ambiente necessarie per la connessione al database MySQL.
6. Avvia l'applicazione utilizzando il comando `npm run dev`.

