import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import TestsPreview from './components/TestsPreview';
import QuestionsPreview from './components/QuestionsPreview';
import Question from './components/Question';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TestsPreview />} />
        <Route path='/TestsPreview' element={<TestsPreview />}/>
        <Route path='/QuestionsPreview' element={<QuestionsPreview />}/>
        <Route path='/Question' element={<Question />}/>
      </Routes>
    </Router>
  );
}

export default App
