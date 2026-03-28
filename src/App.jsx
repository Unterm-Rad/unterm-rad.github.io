import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import PostDetail from './pages/PostDetail'
import About from './pages/About'
import Bookshelf from './pages/Bookshelf'   // 新增书架页面
import Tags from './pages/Tags'
import TagResults from './pages/TagResults'


function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Routes>
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:tag" element={<TagResults />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<PostDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App