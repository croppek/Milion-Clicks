import React from "react";
import { connect } from "react-redux";

// Import akcji redux
import { searchNumber } from "../actions/searchActions";

class Search extends React.Component {
   
   // Obsługa przycisku wyszukiwania podanego numeru
   handleSearch(num) {
         
      let number = num;
      
      // Jeżeli przesłany do metody numer nie jest ustawiony, pobieram go z pola tekstowego
      if(number == undefined) {
         number = document.querySelector("#numberInput").value.replace(/[^\w\s]/gi, '').replace(/\s/g,'').toUpperCase();  
      }
      
      // Jeżeli numer nie jest pusty i jest różny od poprzednio wyszukiwanego odpalam akcję walidującą i wyszukującą numer
      if(number.length > 0) {
         if(this.props.searchResults.prevNumber !== number) {
            this.props.searchNumber(number);
         }
      }
   }
   
   // Usuwanie numerów z historii wyszukiwania
   removeElementFromHistory(number) {
      this.props.removeFromList(number);
      removeFromHistory(number);
   }
   
   render() {
      
      // Lista wyszukań w historii
      let listItems = this.props.historyList.list.map((number) =>
         <li 
            key={number} 
            id={number} 
            onMouseEnter={ (e) => toggleButton(e, true) } 
            onMouseLeave={ (e) => toggleButton(e, false) }
            onClick={ (event) => {                                        
                  this.handleSearch(number);
               } 
            }
         >
               {number}
               <span onClick={ (event) => { 
                           this.removeElementFromHistory(number);
                           event.stopPropagation();
                        } 
                     }
               >
               </span>
         </li>
      );
      
      // Render część odpowiedzialnej za wyszukiwanie numerów oraz historii wyszukiwania
      return (
         <section className="container">
        
            <div className="searchBar">
               <h1>Podaj numer NIP, REGON lub KRS</h1>
               <input id="numberInput" type="text" />
               <p id="errorMessage">{ this.props.searchResults.error }</p>
               <button onClick={ () => this.handleSearch() } id="searchButton">Szukaj</button>
           </div>

           <div className="history">
               <h1>Historia wyszukiwania</h1>
               <label>Automatycznie usuwaj wyszukania starsze niż:</label> 
               <SelectTime />

               <ul id="historyList">
                  { listItems }
               </ul>
           </div>
           
       </section>
      );
   }
};

const mapStateToProps = (state) => {
   return {
      historyList: state.historyReducer,
      searchResults: state.searchReducer
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      searchNumber: (number) => {
         dispatch(searchNumber(number));
      },
      removeFromList: (number) => {
         dispatch(removeFromList(number));
      }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);