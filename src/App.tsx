import React from 'react';
import { EditorProvider } from './context/EditorContext.tsx';
import { Header } from './components/layout/Header.tsx';
import { LeftSidebar } from './components/sidebar/LeftSidebar.tsx';
import { Canvas } from './components/canvas/Canvas.tsx';
import { RightSidebar } from './components/sidebar/RightSidebar.tsx';

export const App: React.FC = () => {
  return (
    <EditorProvider>
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-zinc-950 text-zinc-100 font-sans antialiased">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar />
          <Canvas />
          <RightSidebar />
        </div>
      </div>
    </EditorProvider>
  );
};

export default App;
