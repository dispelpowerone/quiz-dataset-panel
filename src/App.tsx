import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import TestsPreview from './components/TestsPreview';
import QuestionsPreview from './components/QuestionsPreview';
import Question from './components/Question';
import Boo from './screens/Boo';


function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<TestsPreview />} />
        <Route path='/TestsPreview' element={<TestsPreview />}/>
        <Route path='/QuestionsPreview' element={<QuestionsPreview />}/>
        <Route path='/Question' element={<Question />}/>
        <Route path='/Boo' element={<Boo />}/>
      </Routes>
    </Router>
  );
}

export default App
