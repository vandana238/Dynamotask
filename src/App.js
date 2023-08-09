import { Route, Routes } from 'react-router-dom';
import classes from './App.module.scss';
import { Layout } from './components';
import { BotBuilder, Home, NlpApps } from './pages';
import Mycards from './components/Mycards';
import EntitiesFile from './components/Entities/EntitiesFile';
import IntentsFile from './components/Intents/IntentsFile';
import SettingsFile from './components/Settings/SettingsFile';
import SampleIntents from './components/SampleFiles/SampleIntents';
import Breadcrumbs from './components/BreadCrumbss/Breadcrumbs';
import FlowFile from './components/Flow/FlowFile';
import PracticeFile from './components/practice/PractileFile';

function App() {
  
  return (
    <div className={classes.App}>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/nlp-apps' element={<NlpApps />}/>
          <Route path='/bot-builder' element={<BotBuilder />}/>
          <Route path='/apps/:id' element={<Mycards/>}/>
          <Route path='/apps/:id/IntentsFile' element={<IntentsFile/>}/>
          <Route path='apps/:id/EntitiesFile' element={<EntitiesFile/>}/>
          <Route path='apps/:id/SettingsFile' element={<SettingsFile/>}/>
          <Route path='/Sample' element={<SampleIntents/>}/>
          <Route path='/FlowFile' element={<FlowFile/>}/>
          <Route path='/PracticeFile' element={<PracticeFile/>}/>









          
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
