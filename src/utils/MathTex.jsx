import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const MathText = ({ text }) => {
  if (!text) return null;

  // 1. The Regex
  // This looks for content wrapped in:
  // $$...$$ (Block math)
  // OR \[...\] (Block math)
  // OR \(...\) (Inline math)
  const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\(.*\\\))/g;

  // 2. Split the text
  // The 'split' function with a capturing group () includes the separators in the result array
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        // Check if this part is Block Math ($$ or \[)
        if (part.startsWith('$$') || part.startsWith('\\[')) {
            // Strip the delimiters
            const math = part.startsWith('$$') 
              ? part.slice(2, -2) 
              : part.slice(2, -2); 
            
            return (
               <span 
                 key={index} 
                 dangerouslySetInnerHTML={{ 
                   __html: katex.renderToString(math, { displayMode: true, throwOnError: false }) 
                 }} 
               />
            );
        }
        // Check if this part is Inline Math (\()
        else if (part.startsWith('\\(')) {
            const math = part.slice(2, -2); // Remove \( and \)
            return (
               <span 
                 key={index} 
                 dangerouslySetInnerHTML={{ 
                   __html: katex.renderToString(math, { displayMode: false, throwOnError: false }) 
                 }} 
               />
            );
        }
        // Otherwise, it's just text
        else {
           return <span key={index}>{part}</span>;
        }
      })}
    </span>
  );
};

export default MathText;