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


function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<DomainsPreview />} />
        <Route path="/:domainName">
          <Route path="tests" element={<TestsPreview />}/>
          <Route path="tests/:testId">
            <Route path="questions" element={<QuestionsPreview />}/>
            <Route path="questions/:questionId" element={<Question />}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App
