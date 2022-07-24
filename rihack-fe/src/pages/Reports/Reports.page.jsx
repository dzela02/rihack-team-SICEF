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
import { getUserReports } from '../../api/reports/index';
import credentialsService from '../../services/credentialsService';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Reports.styles.scss';

mapboxgl.accessToken =
  'pk.eyJ1IjoibnJpc3RpYyIsImEiOiJjbDN3cGd6NncxYnlxM3NueW5xZzhvczNvIn0.bmGtnKW03rnBazYE_1qt4Q';

const Reports = () => {
  const [imageModal, setImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [mapModal, setMapModal] = useState(false);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = credentialsService;

  const mapContainer = useRef(null);
  const map = useRef(null);

  const fetchReports = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await getUserReports(user._id);

      setReports(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [user._id]);

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
    <div className="reports-page">
      <Navigation />
      <div className="reports-page__section">
        <h3>All reports</h3>
        {!isLoading && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Created at</TableCell>
                <TableCell align="right">Updated at</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((row) => (
                <TableRow key={row._id}>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        setImageUrl(row.image);
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
                        setLat(row.location.lat);
                        setLong(row.location.long);
                        setMapModal(true);
                      }}
                    >
                      Show location
                    </Button>
                  </TableCell>
                  <TableCell align="right">{row.createdAt}</TableCell>
                  <TableCell align="right">{row.updatedAt}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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

export default Reports;
