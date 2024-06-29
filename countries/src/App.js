import axios from "axios"
import {useState,useEffect} from "react"

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const languages = Object.values(country.languages)
  const flagPic = country.flags.png
  const capital = country.capital[0]

  useEffect(() => {
    const key = '394420726a710aaff60b5ea1745a2177'
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    axios.get(url).then(({ data }) => {
      setWeather(data)
    })
  }, [])

  if (!weather) {
    return null
  }

  const weatherPic = weather.weather[0].icon
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherPic}@2x.png`

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>population : {country.population}</p>
      <p>capital : {capital}</p>
      <b>languages :</b>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}  
      </ul>
      <img src={flagPic}/>
      <br/><br/>
      <b>Weather in {capital}</b>

      <p>temperature {weather.main.temp} Celsius</p>

      <img src={weatherIconUrl}/>

      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const CountryList = ({ countries, showCountry }) => {
  if (countries.length>10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  else if ( countries.length===1) {
    return <Country country={countries[0]} />
  }

  else return (
    <div>
      {countries.map(country =>
        <p key={country.fifa}>
          {country.name.common}
          <button onClick={() => showCountry(country.name.common)}>
            show
          </button>
        </p>
      )}
    </div>
  )
}
 
const App = () => {
  const [search, setSearch] = useState('fi')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(({ data }) => {
      setCountries(data)
    })
  }, [])

  const matchedContries = countries.filter(
    country => country.name.common
      .toLowerCase().includes(search.toLocaleLowerCase())
  )

  return (
    <div>
      <div>
        find country <input value={search} onChange={({ target }) => setSearch(target.value)} />
      </div>
      <CountryList 
        countries={matchedContries}
        showCountry={setSearch}
      />
    </div>
  )
}

export default App