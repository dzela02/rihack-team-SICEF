import React, { useEffect, useCallback, useState } from 'react';
import Navigation from '../../components/Navigation';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { getLeaderboard } from '../../api/leaderboard/index';

import './Leaderboard.styles.scss';

const Reports = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await getLeaderboard();

      setUsers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="leaderboard">
      <Navigation />
      <div className="leaderboard__section">
        <h3>Leaderboard</h3>
        {!isLoading && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row._id}>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Reports;
