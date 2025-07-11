import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Annotation,
} from 'react-simple-maps';
import { useAppStore } from '../../store/appStore';
import { countries } from '../../data/countries';

const geoUrl =
  'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';

interface WorldMapProps {
  position: { coordinates: [number, number]; zoom: number };
  onPositionChange: (position: {
    coordinates: [number, number];
    zoom: number;
  }) => void;
  showCountryNames?: boolean;
}

export const WorldMap = ({
  position,
  onPositionChange,
  showCountryNames = false,
}: WorldMapProps) => {
  const { selectedCountry, selectCountry } = useAppStore();

  const handleCountryClick = (countryId: string) => {
    const country = countries.find((c) => c.id === countryId);
    if (country?.enabled) {
      selectCountry(countryId);
    }
  };

  const getCountryColor = (countryId: string) => {
    const country = countries.find((c) => c.id === countryId);
    if (!country) return '#E5E7EB';

    if (!country.enabled) return '#9CA3AF';

    if (selectedCountry === countryId) return '#EF4444';

    return '#6B7280';
  };

  return (
    <div className="w-full h-full">
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{
          scale: 120,
          center: [0, 0],
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={onPositionChange}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryId = geo.id;
                const country = countries.find((c) => c.id === countryId);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getCountryColor(countryId)}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: {
                        outline: 'none',
                        cursor: country?.enabled ? 'pointer' : 'default',
                      },
                      hover: {
                        outline: 'none',
                        fill: country?.enabled
                          ? '#F59E0B'
                          : getCountryColor(countryId),
                      },
                      pressed: {
                        outline: 'none',
                        fill: '#DC2626',
                      },
                    }}
                    onClick={() => {
                      if (country?.enabled) {
                        handleCountryClick(countryId);
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
          {showCountryNames && (
            <>
              {countries
                .filter((country) => country.enabled)
                .map((country) => (
                  <Annotation
                    key={country.id}
                    subject={country.coordinates}
                    dx={0}
                    dy={0}
                    connectorProps={{
                      stroke: 'none',
                    }}
                  >
                    <text
                      x={0}
                      y={0}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      style={{
                        fontFamily: 'system-ui, sans-serif',
                        fontSize: `${7 / position.zoom}px`,
                        fontWeight: 'bold',
                        fill: '#1F2937',
                        pointerEvents: 'none',
                      }}
                    >
                      {country.nameJa}
                    </text>
                  </Annotation>
                ))}
            </>
          )}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};
