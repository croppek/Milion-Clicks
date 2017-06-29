import axios from 'axios';

export function searchNumber(number) {
   return dispatch => {
      
      // Wyświetlenie loadera
      toggleLoader("show");
         
      const validate = validateNumber(number);
         
      // Walidacja podanego numeru
      if(validate == true) {
         
         // Czekam na ukrycie poprzednich wyników i wyświetlenie loadera
         setTimeout(() => { 
         
            // Sprawdzenie czy numer znajduje się już w historii
            if(localStorage.getItem(number) == null) {
               // Pobranie danych z API
               axios.get('https://crossorigin.me/http://ihaveanidea.aveneo.pl/NIPAPI/Api/Company', {
                  params: {
                     CompanyId: number
                  }
               })
               .then(function (response) {
                  dispatch({
                     type: "SHOW_RESULTS",
                     payload: {
                        response: response,
                        number: number
                     }
                  });
                  
                  // Ukrycie loadera i wyświetlenie wyników wyszukiwania
                  setTimeout(() => {
                     toggleLoader("hide");
                  }, 500);
               })
               .catch(function (error) {
                  dispatch({
                     type: "SEARCH_ERROR",
                     payload: {
                        error: "Błąd serwera, odśwież stronę i spróbuj ponownie.",
                        prevNumber: number
                     }
                  });

                  setTimeout(() => {
                     toggleLoader("hide");
                  }, 500);
               });  
            } else {
               // Wyświetlenie danych z historii
               dispatch({
                  type: "DISPLAY_FROM_HISTORY",
                  payload: number
               });

               setTimeout(() => {
                  toggleLoader("hide");
               }, 500);
            }
            
         }, 500);
         
      } else {
         // Błąd walidacji, wyświetlenie błędu
         dispatch({
            type: "SEARCH_ERROR",
            payload: { error: validate }
         });

         setTimeout(() => {
            toggleLoader("hide");
         }, 500);
      }
   }
}

// Ustawienie stanu numeru na "dodany do listy"
export function addedToHistory() {
   return dispatch => { 
      dispatch({
         type: "ADDED_TO_HISTORY"
      });
   } 
}