const initialState = { 
   results: {},
   error: "",
   number: 0,
   prevNumber: 0,
   shouldAddToHistory: false
}

const searchReducer = (state = initialState, action) => {
   
   let newState = { ...state };
   
   switch (action.type) {
      
      // Pokazanie wyników użytkownikowi lub wyświetlenie błędu
      case "SHOW_RESULTS": {
         
         highlightListElement(false);
         
         newState.number = action.payload.number;
         newState.error = "";
         newState.shouldAddToHistory = false;
         
         const response = action.payload.response.data;
         
         // Wstępne sprawdzenie wyników
         if(response.Success == true) {
            if(response.CompanyInformation !== null) {
               
               newState.results = response.CompanyInformation;
               
               // Jeżeli wyniki są poprawne a numer nie znajdował się wcześniej w historii wyszukiwania, dodaję go
               if(localStorage.getItem(newState.number) == null && newState.prevNumber != newState.number) {
                  newState.shouldAddToHistory = true;
                  addToHistory(newState.number, newState.results);
               }
               
            } else {
               newState.error = "Brak wyników.";
            }
         } else {
            newState.error = "Podany numer jest niewłaściwy, spróbuj ponownie.";
         }
         
         newState.prevNumber = newState.number;
         
         break;  
      }
      
      // Ustawienie błędu
      case "SEARCH_ERROR": {
         
         newState.results = {};
         newState.error = action.payload.error;
         newState.prevNumber = action.payload.prevNumber;
         newState.shouldAddToHistory = false;

         break;  
      }
       
      // Wyświetlenie wyników pobranych z historii wyszukiwania
      case "DISPLAY_FROM_HISTORY": {
         
         newState.results = JSON.parse(localStorage.getItem(action.payload));
         newState.error = "";
         newState.prevNumber = action.payload;
         newState.shouldAddToHistory = false;
         
         //document.getElementById(action.payload).style.backgroundColor = "#00765A";
         highlightListElement(action.payload);
         
         break;
      }
      
      // Ustawienie stanu numeru na "dodany do historii"
      case "ADDED_TO_HISTORY": {
         
         newState.shouldAddToHistory = false;
         
      }
         
      default: {
         return newState;
      }
   }
   return newState;
};

export default searchReducer;