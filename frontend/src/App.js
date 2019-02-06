import React, { Component } from 'react';
import './App.css';
import data from './data/output.json';

class App extends Component {

  render() {
    // get json values into an array
    const results = Object.keys(data).map(i => data[i])
    const imageChecker = /\.(gif|jpg|jpeg|tiff|png)$/i
    return (
      <div className="w-100 mw8 center pa4">
        <article className="pa3 pa5-ns">
          <h1 className="f2" title="Titel">{results[1]}</h1>
          {imageChecker.test(results[3]) ?
            <img title="media" src={results[3]} alt={results[1]} className="w-100 f5 measure" />
            : (results[3].includes('video')
              ? <div title="media" dangerouslySetInnerHTML={{ __html: results[3] }} />
              : <span title="ingen media">{results[3]}</span>
            )
          }
          <p title="artikeln" className="measure lh-copy">
            {results[5]}
          </p>


          <div className="pa4">
            <blockquote className="athelas ml0 mt0 pl4 black-90 bl bw2 b--blue">
              <p className="f5 f4-m f3-l lh-copy measure mt0">
                <span key={results[1]}>
                  <a title="sidan" className="link bg-animate hover-bg-light-blue" href={results[0]}>Länk till sidan</a>
                </span><br/>
                <span className="dim green">Artikeltyp: {results[2]}</span>
                <br/><b>Meta description:</b><br />
                <span>{results[4]}</span>

              </p>
              <cite className="f6 ttu tracked fs-normal">―Stanley Morison</cite>
            </blockquote>
          </div>
        </article>
      </div>
    );
  }
}

export default App;

