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
import { getAllReports, updateReportStatus } from '../../api/reports/index';

import 'mapbox-gl/dist/mapbox-gl.css';
import './BackOffice.styles.scss';

mapboxgl.accessToken =
  'pk.eyJ1IjoibnJpc3RpYyIsImEiOiJjbDN3cGd6NncxYnlxM3NueW5xZzhvczNvIn0.bmGtnKW03rnBazYE_1qt4Q';

const BackOffice = () => {
  const [imageModal, setImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [mapModal, setMapModal] = useState(false);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const mapContainer = useRef(null);
  const map = useRef(null);

  const fetchReports = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await getAllReports();

      setReports(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
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

  const changeStatus = useCallback(
    async (id, status, points) => {
      try {
        await updateReportStatus(id, status, points);

        fetchReports();
      } catch (e) {
        console.error(e);
      }
    },
    [fetchReports]
  );

  return (
    <div className="back-office">
      <Navigation />
      <div className="back-office__section">
        <h3>All reports</h3>
        {!isLoading && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reporter</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Created at</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Resolve</TableCell>
                <TableCell align="right">Decline</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.user.name}
                  </TableCell>
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
                  <TableCell align="right">
                    {new Date(row.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <span
                      className={
                        row.status === 'pending'
                          ? 'status-yellow'
                          : row.status === 'resolved'
                          ? 'status-green'
                          : 'status-red'
                      }
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    {row.status === 'pending' && (
                      <Button
                        onClick={() => changeStatus(row._id, 'resolved', 1)}
                      >
                        Resolve
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {row.status === 'pending' && (
                      <Button onClick={() => changeStatus(row._id, 'rejected')}>
                        Decline
                      </Button>
                    )}
                  </TableCell>
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

export default BackOffice;
