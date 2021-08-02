import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AddBook from '../components/AddBook';
import BooksList from '../components/BooksList';
import useLocalStorage from '../hooks/useLocalStorage';
import EditBook from '../components/EditBook';
import BooksContext from '../context/BooksContext';
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";

import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new AppSearchAPIConnector({
  searchKey: "search-371auk61r2bwqtdzocdgutmg",
  engineName: "search-ui-examples",
  endpointBase: "http://127.0.0.1:3002",
  cacheResponses: false
});

const AppRouter = () => {
  const [books, setBooks] = useLocalStorage('books', []);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
        <SearchProvider
      config={{
        apiConnector: connector
      }}
    >
      <div className="App">
        <Layout
          header={<SearchBox />}
          bodyContent={<Results titleField="title" urlField="nps_link" />}
        />
      </div>
    </SearchProvider>
          <BooksContext.Provider value={{ books, setBooks }}>
            <Switch>
              <Route component={BooksList} path="/" exact={true} />
              <Route component={AddBook} path="/add" />
              <Route component={EditBook} path="/edit/:id" />
              <Route component={() => <Redirect to="/" />} />
            </Switch>
          </BooksContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
