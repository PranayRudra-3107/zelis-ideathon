import {useState, useEffect} from 'react';

const Database = () => {
  const [ideas, setIdeas] = useState(false);

  function getIdeas() {
    fetch('http://localhost:3001/')
      .then(response => {
        console.log(response.text);
        return response.text();
      })
      .then(data => {
        setIdeas(data);
      });
  }
  useEffect(() => {
    getIdeas();
  }, []);
  return (
    <div>
      {ideas ? ideas : 'There is no merchant data available'}
      
    </div>
  );
}
export default Database;