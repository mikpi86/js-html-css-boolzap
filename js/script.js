/* 
Milestone 1

Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse

Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

Milestone 2

Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione

Click sul contatto mostra la conversazione del contatto cliccato

Milestone 3

Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde

Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
*/

var app = new Vue({

  el: '#root',

  data: {

    imagePath: 'img/avatar',

    imageExtension: '.jpg',

    searchbar: '',

    newMessage: '',

    last_access: 'Ultimo accesso oggi alle 00:01',
    
    user: {
      name: 'Michela',
      avatar: '_io'
    },
    
    active_chat: 0,

    contacts: [
      {
        name: 'Martino',
        avatar: '_1',
        visible: true,
        messages: [{
            date: '10/01/2020 15:30:55',
            text: 'Hai portato a spasso il cane?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Ricordati di dargli da mangiare',
            status: 'sent'
          },
          {
            date: '10/01/2020 16:15:22',
            text: 'Tutto fatto!',
            status: 'received'
          }
        ],
      },

      {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [{
            date: '20/03/2020 16:30:00',
            text: 'Ciao come stai?',
            status: 'sent'
          },
          {
            date: '20/03/2020 16:30:55',
            text: 'Bene grazie! Stasera ci vediamo?',
            status: 'received'
          },
          {
            date: '20/03/2020 16:35:00',
            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'sent'
          }
        ],
      },

      {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [{
            date: '28/03/2020 10:10:40',
            text: 'La Marianna va in campagna',
            status: 'received'
          },
          {
            date: '28/03/2020 10:20:10',
            text: 'Sicuro di non aver sbagliato chat?',
            status: 'sent'
          },
          {
            date: '28/03/2020 16:15:22',
            text: 'Ah scusa!',
            status: 'received'
          }
        ],
      },

      {
        name: 'Luigi',
        avatar: '_4',
        visible: true,
        messages: [{
            date: '10/01/2020 15:30:55',
            text: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Si, ma preferirei andare al cinema',
            status: 'received'
          }
        ],
      },
    ]
    
  }, // chiusura data

  methods: {

    isActive(index) {
      this.active_chat = index;
    }, // chiusura isActive

    sendNewMessage() {     
      console.log(this.newMessage);

      let newMessage_Object = {
        date: '',
        text: '',
        status: 'sent'
      };

      let newReceivedMessage_Object = {
        date: '',
        text: 'Ok',
        status: 'received'
      };

      // assegno il valore dell'input al valore di text
      newMessage_Object.text = this.newMessage;
      // newMessage_Object.date = new Date().toLocaleString(); // con new Date javascript
      newMessage_Object.date = dayjs().format('DD/MM/YYYY hh:mm:ss'); // con dayjs
      console.log(newMessage_Object);

      // faccio un push dell'oggetto nella lista dei messaggi
      this.contacts[this.active_chat].messages.push(newMessage_Object);
      console.log(this.contacts[this.active_chat].messages);

      //ripulisco la barra dell'input
      this.newMessage = '';

      // stampa risposta dopo un secondo
      setTimeout(() => {
        this.contacts[this.active_chat].messages.push(newReceivedMessage_Object);
        // newReceivedMessage_Object.date = new Date().toLocaleString(); // con new Date javascript
        newReceivedMessage_Object.date = dayjs().format('DD/MM/YYYY hh:mm:ss'); // con dayjs
        console.log(this.contacts[this.active_chat].messages);
        this.last_access = 'Online';
      }, 3000);

      
    }, // chiusura sendNewMessage

    searchContact() {
      console.log(this.searchbar);

      this.contacts.forEach((element) => {
        
        if (element.name.toLowerCase().includes(this.searchbar.toLowerCase())) {
          element.visible = true;
        } else {
          element.visible = false;
        }
        
      });

    }, // chiusura searchContact

  }, // chiusura methods 


});

// per la console di Vue
Vue.config.devtools = true;