import React from 'react';
import {Route} from 'react-router-dom';
import ArticleList from './containers/ArticleListView.js'
import ArticleDetail from './containers/ArticleDetailView.js'
import CustomForm from './components/Form.js'
import Placeholder from './components/placeholder.js'
import MemeTextGen from './components/MemeTextGen.js'

import TextNoteListView from './containers/TextNoteListView.js'
import TextNoteCreate from './forms/TextNoteCreate.js'
import TextNoteDetailUpdate from './forms/TextNoteDetailUpdate.js'

const BaseRouter =() => (
  <div>
    <Route exact path='/article-list/' component={ArticleList}/>
    <Route exact path ='/create-article/' component ={TextNoteCreate} />
    <Route exact path='/article/:articleID' component={ArticleDetail}/>
    <Route exact path='/meme-text-gen/' component = {MemeTextGen} />
    <Route exact path='/placeholder' component = {Placeholder} />
    
    <Route exact path='/text_note_list' component = {TextNoteListView} />
    <Route exact path='/create_note' component = {TextNoteCreate} />
    <Route exact path='/text_note/:noteID' component = {TextNoteDetailUpdate} />



  </div>
)



export default BaseRouter
