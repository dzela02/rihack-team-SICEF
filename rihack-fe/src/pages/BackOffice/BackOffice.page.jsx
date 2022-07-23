import React, { useRef, useEffect, useCallback, useState } from 'react';
import Navigation from '../../components/Navigation';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
} from '@mui/material';
import mapboxgl from 'mapbox-gl';
import { getAllReports } from '../../api/reports/index';

import 'mapbox-gl/dist/mapbox-gl.css';
import './BackOffice.styles.scss';

mapboxgl.accessToken =
  'pk.eyJ1IjoibnJpc3RpYyIsImEiOiJjbDN3cGd6NncxYnlxM3NueW5xZzhvczNvIn0.bmGtnKW03rnBazYE_1qt4Q';

const rows = [
  {
    id: '1asdjashdakdjhj12',
    reporter: 'Frozen yoghurt',
    imageUrl:
      'https://nmcdn.io/e186d21f8c7946a19faed23c3da2f0da/8ed2672177464f2e9b193130d1000c50/files/blog/trash-volumes-increase/trash.jpg',
    description: 'opis',
    longitude: 14.467817,
    latitude: 45.327116,
    createdAt: '24.2.2222.',
    updatedAt: '24.2.2222.',
    status: 'pending',
  },
  {
    id: '123asdasdasd',
    reporter: 'Frozen yoghurt',
    imageUrl:
      'https://i0.wp.com/detourdetroiter.com/wpcom-142100448/wp-content/uploads/2020/07/mariners-1.jpg?fit=1000%2C1333&ssl=1',
    description: 'opis',
    longitude: 14.467817,
    latitude: 45.327116,
    createdAt: '24.2.2222.',
    updatedAt: '24.2.2222.',
    status: 'declined',
  },
  {
    id: '1231afasfsadasda',
    reporter: 'Frozen yoghurt',
    imageUrl:
      'https://experiencelife.lifetime.life/wp-content/uploads/2021/02/Talking-Trash-1280x720.jpg',
    description: 'opis',
    longitude: 14.467817,
    latitude: 45.327116,
    createdAt: '24.2.2222.',
    updatedAt: '24.2.2222.',
    status: 'pending',
  },
];

const BackOffice = () => {
  const [imageModal, setImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [mapModal, setMapModal] = useState(false);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [reports, setReports] = useState(null);

  const mapContainer = useRef(null);
  const map = useRef(null);

  const fetchReports = useCallback(async () => {
    try {
      const { data } = await getAllReports();

      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapContainer.current) {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [long, lat],
          zoom: 17,
        });

        new mapboxgl.Marker().setLngLat([long, lat]).addTo(map.current);
      }
    }, 50);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long, mapContainer]);

  return (
    <div className="back-office">
      <Navigation />
      <div className="back-office__section">
        <h3>All reports</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reporter</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Created at</TableCell>
              <TableCell align="right">Updated at</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Resolve</TableCell>
              <TableCell align="right">Decline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.reporter}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      setImageUrl(row.imageUrl);
                      setImageModal(true);
                    }}
                  >
                    Show image
                  </Button>
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      setLat(row.latitude);
                      setLong(row.longitude);
                      setMapModal(true);
                    }}
                  >
                    Show location
                  </Button>
                </TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">{row.updatedAt}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  {row.status === 'pending' && <Button>Resolve</Button>}
                </TableCell>
                <TableCell align="right">
                  {row.status === 'pending' && <Button>Decline</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal
        className={'eco-modal'}
        open={imageModal}
        onClose={() => setImageModal(false)}
      >
        <div>
          <div className="eco-modal__header">
            <h3>Report image</h3>
            <div
              className="eco-modal__close"
              onClick={() => setImageModal(false)}
            />
          </div>
          <img src={imageUrl} alt="" className="report-image" />
        </div>
      </Modal>
      <Modal
        className={'eco-modal'}
        open={mapModal}
        onClose={() => setMapModal(false)}
      >
        <div>
          <div className="eco-modal__header">
            <h3>Report location</h3>
            <div
              className="eco-modal__close"
              onClick={() => setMapModal(false)}
            />
          </div>
          <div ref={mapContainer} className="mapbox-container" />
        </div>
      </Modal>
    </div>
  );
};

export default BackOffice;
