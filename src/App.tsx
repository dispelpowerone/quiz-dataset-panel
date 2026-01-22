import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import DomainsPreview from './components/DomainsPreview';
import TestsPreview from './components/TestsPreview';
import QuestionsPreview from './components/QuestionsPreview';
import Question from './components/Question';
import DomainProvider from './contexts/DomainProvider';


function App() {
  return (
    <DomainProvider>
      <Router>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<DomainsPreview />} />
          <Route path='/TestsPreview' element={<TestsPreview />}/>
          <Route path='/QuestionsPreview' element={<QuestionsPreview />}/>
          <Route path='/Question' element={<Question />}/>
        </Routes>
      </Router>
    </DomainProvider>
  );
}

export default App
