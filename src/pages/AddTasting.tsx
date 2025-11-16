import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Rating from '../components/common/Rating';
import { BEER_STYLES, BEER_COLORS, BEER_SIZES, BEER_FORMATS, COUNTRIES } from '../utils/constants';
import './AddTasting.css';

const client = generateClient<Schema>();

const AddTasting: React.FC = () => {
  const [step, setStep] = useState<'search' | 'new-beer' | 'tasting'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedBeer, setSelectedBeer] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const [newBeerData, setNewBeerData] = useState({
    name: '',
    style: '',
    country: '',
    description: '',
    alcoholPercentage: '',
    ibu: '',
    color: '',
  });

  const [tastingData, setTastingData] = useState({
    rating: 0,
    size: '',
    format: '',
    consumptionCountry: 'ES',
    venueId: '',
    newVenueName: '',
    newVenueAddress: '',
    liked: false,
  });

  const [venueSearchQuery, setVenueSearchQuery] = useState('');
  const [venueResults, setVenueResults] = useState<any[]>([]);

  const handleSearchBeer = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await client.models.Beer.list({
        filter: { name: { contains: searchQuery } },
      });
      setSearchResults(response.data || []);
    } catch (error) {
      console.error('Error searching beers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBeer = (beer: any) => {
    setSelectedBeer(beer);
    setStep('tasting');
  };

  const handleCreateNewBeer = () => {
    setNewBeerData({ ...newBeerData, name: searchQuery });
    setStep('new-beer');
  };

  const handleSaveNewBeer = async () => {
    setLoading(true);
    try {
      const response = await client.models.Beer.create({
        name: newBeerData.name,
        style: newBeerData.style as any,
        country: newBeerData.country,
        description: newBeerData.description || undefined,
        alcoholPercentage: newBeerData.alcoholPercentage ? parseFloat(newBeerData.alcoholPercentage) : undefined,
        ibu: newBeerData.ibu ? parseInt(newBeerData.ibu) : undefined,
        color: newBeerData.color as any,
      });

      if (response.data) {
        setSelectedBeer(response.data);
        setStep('tasting');
      }
    } catch (error) {
      console.error('Error creating beer:', error);
      alert('Error al crear la cerveza');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchVenue = async () => {
    if (!venueSearchQuery.trim()) return;

    try {
      const response = await client.models.Venue.list({
        filter: { name: { contains: venueSearchQuery } },
      });
      setVenueResults(response.data || []);
    } catch (error) {
      console.error('Error searching venues:', error);
    }
  };

  const handleSaveTasting = async () => {
    if (!selectedBeer) return;

    setLoading(true);
    try {
      let venueId = tastingData.venueId;

      // Crear local si es nuevo
      if (!venueId && tastingData.newVenueName) {
        const venueResponse = await client.models.Venue.create({
          name: tastingData.newVenueName,
          address: tastingData.newVenueAddress,
        });
        if (venueResponse.data) {
          venueId = venueResponse.data.id;
        }
      }

      // Crear degustación
      await client.models.Tasting.create({
        beerId: selectedBeer.id,
        venueId: venueId || undefined,
        rating: tastingData.rating || undefined,
        size: tastingData.size as any,
        format: tastingData.format as any,
        consumptionCountry: tastingData.consumptionCountry,
        consumptionDate: new Date().toISOString(),
        liked: tastingData.liked,
      });

      alert('¡Degustación añadida correctamente!');
      // Resetear formulario
      resetForm();
    } catch (error) {
      console.error('Error saving tasting:', error);
      alert('Error al guardar la degustación');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('search');
    setSearchQuery('');
    setSearchResults([]);
    setSelectedBeer(null);
    setNewBeerData({
      name: '',
      style: '',
      country: '',
      description: '',
      alcoholPercentage: '',
      ibu: '',
      color: '',
    });
    setTastingData({
      rating: 0,
      size: '',
      format: '',
      consumptionCountry: 'ES',
      venueId: '',
      newVenueName: '',
      newVenueAddress: '',
      liked: false,
    });
  };

  return (
    <div className="add-tasting-page">
      <div className="page-header">
        <h1>Nueva Degustación</h1>
        <p className="page-description">
          Comparte tu experiencia cervecera con la comunidad
        </p>
      </div>

      {/* Paso 1: Buscar Cerveza */}
      {step === 'search' && (
        <Card title="Buscar Cerveza">
          <div className="search-section">
            <div className="search-input-group">
              <Input
                placeholder="Buscar cerveza por nombre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchBeer()}
                icon="🔍"
              />
              <Button variant="primary" onClick={handleSearchBeer} loading={loading}>
                Buscar
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="search-results">
                <h4>Resultados ({searchResults.length})</h4>
                <div className="results-grid">
                  {searchResults.map((beer) => (
                    <div
                      key={beer.id}
                      className="beer-result-card"
                      onClick={() => handleSelectBeer(beer)}
                    >
                      <div className="beer-result-image">
                        {beer.photo ? (
                          <img src={beer.photo} alt={beer.name} />
                        ) : (
                          <div className="beer-placeholder">🍺</div>
                        )}
                      </div>
                      <div className="beer-result-info">
                        <h5>{beer.name}</h5>
                        <p>{beer.style} • {beer.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && (
              <div className="new-beer-option">
                <p>¿No encuentras tu cerveza?</p>
                <Button variant="secondary" onClick={handleCreateNewBeer}>
                  Añadir "{searchQuery}" como nueva cerveza
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Paso 2: Nueva Cerveza */}
      {step === 'new-beer' && (
        <Card
          title="Añadir Nueva Cerveza"
          headerAction={
            <Button variant="text" onClick={() => setStep('search')}>
              Volver a búsqueda
            </Button>
          }
        >
          <div className="new-beer-form">
            <Input
              label="Nombre de la Cerveza"
              value={newBeerData.name}
              onChange={(e) => setNewBeerData({ ...newBeerData, name: e.target.value })}
              required
            />

            <Select
              label="Estilo"
              value={newBeerData.style}
              onChange={(e) => setNewBeerData({ ...newBeerData, style: e.target.value })}
              options={BEER_STYLES}
              placeholder="Selecciona un estilo"
              required
            />

            <Select
              label="País de Origen"
              value={newBeerData.country}
              onChange={(e) => setNewBeerData({ ...newBeerData, country: e.target.value })}
              options={COUNTRIES}
              placeholder="Selecciona un país"
              required
            />

            <Select
              label="Color"
              value={newBeerData.color}
              onChange={(e) => setNewBeerData({ ...newBeerData, color: e.target.value })}
              options={BEER_COLORS}
              placeholder="Selecciona un color"
            />

            <Input
              label="Porcentaje de Alcohol (%)"
              type="number"
              step="0.1"
              value={newBeerData.alcoholPercentage}
              onChange={(e) => setNewBeerData({ ...newBeerData, alcoholPercentage: e.target.value })}
              placeholder="5.0"
            />

            <Input
              label="IBU (Amargor)"
              type="number"
              value={newBeerData.ibu}
              onChange={(e) => setNewBeerData({ ...newBeerData, ibu: e.target.value })}
              placeholder="40"
            />

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                value={newBeerData.description}
                onChange={(e) => setNewBeerData({ ...newBeerData, description: e.target.value })}
                placeholder="Describe esta cerveza..."
                rows={4}
              />
            </div>

            <div className="form-actions">
              <Button variant="secondary" onClick={() => setStep('search')}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSaveNewBeer} loading={loading}>
                Continuar
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Paso 3: Degustación */}
      {step === 'tasting' && selectedBeer && (
        <Card
          title="Detalles de la Degustación"
          headerAction={
            <Button variant="text" onClick={() => setStep('search')}>
              Cambiar cerveza
            </Button>
          }
        >
          <div className="tasting-form">
            <div className="selected-beer-info">
              <div className="beer-image-small">
                {selectedBeer.photo ? (
                  <img src={selectedBeer.photo} alt={selectedBeer.name} />
                ) : (
                  <div className="beer-placeholder">🍺</div>
                )}
              </div>
              <div>
                <h3>{selectedBeer.name}</h3>
                <p>{selectedBeer.style} • {selectedBeer.country}</p>
              </div>
            </div>

            <div className="form-group">
              <label>Valoración</label>
              <Rating
                value={tastingData.rating}
                onChange={(rating) => setTastingData({ ...tastingData, rating })}
                size="large"
              />
            </div>

            <Select
              label="Tamaño"
              value={tastingData.size}
              onChange={(e) => setTastingData({ ...tastingData, size: e.target.value })}
              options={BEER_SIZES}
              placeholder="Selecciona un tamaño"
              required
            />

            <Select
              label="Formato"
              value={tastingData.format}
              onChange={(e) => setTastingData({ ...tastingData, format: e.target.value })}
              options={BEER_FORMATS}
              placeholder="Selecciona un formato"
              required
            />

            <Select
              label="País de Consumo"
              value={tastingData.consumptionCountry}
              onChange={(e) => setTastingData({ ...tastingData, consumptionCountry: e.target.value })}
              options={COUNTRIES}
            />

            <div className="venue-section">
              <h4>Local / Cervecería (opcional)</h4>
              <div className="search-input-group">
                <Input
                  placeholder="Buscar local..."
                  value={venueSearchQuery}
                  onChange={(e) => setVenueSearchQuery(e.target.value)}
                />
                <Button variant="secondary" onClick={handleSearchVenue}>
                  Buscar
                </Button>
              </div>

              {venueResults.length > 0 && (
                <div className="venue-results">
                  {venueResults.map((venue) => (
                    <div
                      key={venue.id}
                      className={`venue-item ${tastingData.venueId === venue.id ? 'selected' : ''}`}
                      onClick={() => setTastingData({ ...tastingData, venueId: venue.id })}
                    >
                      <strong>{venue.name}</strong>
                      <p>{venue.address}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="new-venue-form">
                <p>o añade un nuevo local:</p>
                <Input
                  placeholder="Nombre del local"
                  value={tastingData.newVenueName}
                  onChange={(e) => setTastingData({ ...tastingData, newVenueName: e.target.value })}
                />
                <Input
                  placeholder="Dirección"
                  value={tastingData.newVenueAddress}
                  onChange={(e) => setTastingData({ ...tastingData, newVenueAddress: e.target.value })}
                />
              </div>
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={tastingData.liked}
                  onChange={(e) => setTastingData({ ...tastingData, liked: e.target.checked })}
                />
                <span>Me gusta este local</span>
              </label>
            </div>

            <div className="form-actions">
              <Button variant="secondary" onClick={resetForm}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSaveTasting} loading={loading}>
                Guardar Degustación
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AddTasting;
