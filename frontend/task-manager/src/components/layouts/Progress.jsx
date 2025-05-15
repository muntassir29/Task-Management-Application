// const Progress = ({ progress, status }) => {
//   const getColor = () => {
//     switch (status) {
//       case 'In Progress':
//         return 'text-cyan-500 bg-cyan-500 border border-cyan-500/10';

//       case 'Completed':
//         return 'text-indigo-500 bg-indigo-500 border border-indigo-500/10';

//       default:
//         return 'text-violet-500 bg-violet-500 border border-violet-500/10';
//     }
//   };

//   return (
//     <div className="w-full bg-gray-200 rounded-full h-1.5">
//       <div className={`${getColor()} h-1.5 rounded-full text-center text-xs font-medium`}>

//       </div>
//     </div>
//   );
// };

// export default Progress;

const Progress = ({ progress = 0, status }) => {
  const getColor = () => {
    switch (status) {
      case 'In Progress':
        return 'bg-cyan-500';
      case 'Completed':
        return 'bg-indigo-500';
      default:
        return 'bg-violet-500';
    }
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
      <div
        className={`${getColor()} h-1.5 rounded-full transition-all duration-300`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Progress;

