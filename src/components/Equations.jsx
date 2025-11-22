// import 'katex';
import { BlockMath, InlineMath } from 'react-katex';
const Equation = ({ equation = '', display = false }) => {
    try{
        return display ? <BlockMath>{equation}</BlockMath> : <InlineMath>{equation}</InlineMath>;
    } catch (error) {
        // console.error("Error rendering equation:", error);
        return <code className="text-sm text-red-600">{equation}</code>;
    }
//   return (
//     // katex.
//     <div className="equation">
//       {/* If Time allows, Need to use MathJax or KaTeX to render the equations */}
//       <p>{equation}</p>
//     </div>
//   );
};

export default Equation;