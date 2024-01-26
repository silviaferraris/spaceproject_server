// crea una funzione che recupera il token dalla richiesta
// mettere il middleware dentro .use()
// verifica il token con la funzione apposita
// se il token è verificato, chiama next() e Hono va avanti allo step successivo (altro middleware o endpoint)
// altrimenti ritorni 401 e decidere se mandare un redirect alla pagina di login oppure ritornare uno stato 401 e gestire la cosa lato frontend
