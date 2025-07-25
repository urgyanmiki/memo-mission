import './App.css'
import { CardList } from './components/CardList'
import Header from './components/Header'
import { Wrapper } from './components/Wrapper'

function App() {
  return (
    <>
      <Header />
      <Wrapper>
        <CardList />
      </Wrapper>
    </>
  )
}

export default App
