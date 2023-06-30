'use client'

import { useState } from 'react'
import Modal from 'react-modal'

interface iListProps {
  results: []
}

interface Resident {
  name: string
}

interface Planet {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: Array<string>;
}

const customStyles = {
  content: {
    width: '80%',
    height: '80%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

const fetchResidents = async (residents: string[]) => {
  const responses = await Promise.all(residents.map(resident => fetch(resident)));
  const residentsData = await Promise.all(responses.map(response => response.json()));

  return residentsData;
}

const Planets = (props: iListProps) => {
  const [isOpen, _setIsOpen] = useState(false)
  const [activePlanet, _setActivePlanet] = useState<Planet | null>(null)
  const [residents, _setResidents] = useState<Array<Resident> | null>(null)

  const residentContent = () => {
    if (residents) {
      return (
        <>
          {residents?.length ? <h3 className='font-bold text-black'>People</h3> : <></>}

          <ul>
            {residents.map(resident => (
              <li className='text-black' key={resident.name}>{resident.name}</li>
            ))}
          </ul>
        </>)
    }
    else {
      return (
        <div className='flex items-center'>
          <p className="text-gray-600 text-lg mr-2">Loading</p>
          <div className="animate-ellipsis text-gray-600">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )
    }
  }

  const modalContent = () => {
    if (activePlanet) {
      return (
        <div className='w-full max-w-lg m-auto'>
          <span className='flex justify-between capitalize text-black'>
            <p>name:</p>
            <p className='text-right'>{activePlanet.name}</p>
          </span>

          <span className='flex justify-between capitalize text-black'>
            <p>diameter:</p>
            <p className='text-right'>{activePlanet.diameter}</p>
          </span>

          <span className='flex justify-between capitalize text-black'>
            <p>rotation_period:</p>
            <p className='text-right'>{activePlanet.rotation_period}</p>
          </span>

          <span className='flex justify-between capitalize text-black'>
            <p>orbital_period:</p>
            <p className='text-right'>{activePlanet.orbital_period}</p>
          </span>

          <span className='flex justify-between capitalize text-black'>
            <p>gravity:</p>
            <p className='text-right'>{activePlanet.gravity}</p>
          </span>

          <span className='flex justify-between capitalize text-black'>
            <p>population:</p>
            <p className='text-right'>{Intl.NumberFormat().format(+activePlanet.population)}</p>
          </span>

          <span className='flex justify-between capitalize text-black'>
            <p>climate:</p>
            <p className='text-right'>{activePlanet.climate}</p>
          </span>

          <span className='flex justify-between capitalize text-black'>
            <p>terrain:</p>
            <p className='text-right ml-12'>{activePlanet.terrain}</p>
          </span>

          <span className='flex justify-between capitalize text-black mb-6'>
            <p>surface_water:</p>
            <p className='text-right'>{activePlanet.surface_water}</p>
          </span>

          {residentContent()}
        </div>
      )
    }
    else {
      return <></>
    }
  }

  return (
    <>
      <div className="w-full max-w-lg grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        {props.results.map((planet: Planet) => (
          <button key={planet.name} onClick={async () => {
            _setIsOpen(true);
            _setActivePlanet(planet);

            const fetchedResidents = await fetchResidents(planet.residents);
            _setResidents(fetchedResidents);
          }
          }>
            <p>{planet.name}</p>
          </button>
        ))}
      </div>

      <Modal style={customStyles} isOpen={isOpen} onRequestClose={() => {
        _setIsOpen(false)
        _setResidents(null)
      }}>
        <button className="absolute right-2 top-2" onClick={() => _setIsOpen(false)}>X</button>

        {modalContent()}
      </Modal >
    </>
  )
}

export default Planets