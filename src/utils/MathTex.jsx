import katex from 'katex';
import 'katex/dist/katex.min.css';

const MathText = ({ text }) => {
  if (!text) return null;

  // Enhanced regex that handles all LaTeX delimiters:
  // 1. $$...$$ (block/display math)
  // 2. \[...\] (block/display math)
  // 3. \(...\) (inline math)
  // 4. $...$ (inline math) - but NOT $$
  // 
  // The key is to match $$ BEFORE single $, and use negative lookahead/lookbehind
  const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$(?!\$)[\s\S]*?\$(?!\$))/g;
  
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        // Skip empty parts
        if (!part) return null;

        // Check if this part is Block Math ($$...$$)
        if (part.startsWith('$$') && part.endsWith('$$')) {
            const math = part.slice(2, -2).trim();
            return (
               <span 
                 key={index} 
                 dangerouslySetInnerHTML={{ 
                   __html: katex.renderToString(math, { displayMode: true, throwOnError: false }) 
                 }} 
               />
            );
        }
        // Check if this part is Block Math (\[...\])
        else if (part.startsWith('\\[') && part.endsWith('\\]')) {
            const math = part.slice(2, -2).trim();
            return (
               <span 
                 key={index} 
                 dangerouslySetInnerHTML={{ 
                   __html: katex.renderToString(math, { displayMode: true, throwOnError: false }) 
                 }} 
               />
            );
        }
        // Check if this part is Inline Math (\(...\))
        else if (part.startsWith('\\(') && part.endsWith('\\)')) {
            const math = part.slice(2, -2).trim();
            return (
               <span 
                 key={index} 
                 dangerouslySetInnerHTML={{ 
                   __html: katex.renderToString(math, { displayMode: false, throwOnError: false }) 
                 }} 
               />
            );
        }
        // Check if this part is Inline Math ($...$) - single dollar signs
        else if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
            const math = part.slice(1, -1).trim();
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