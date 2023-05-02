const express = require('express');
const router = express.Router();
const { Player, Team } = require('../../models');

// GET / - Home page with a list of all teams and their players
router.get('/', async (req, res) => {
    try {
      const teamsData = await Team.findAll({
        include: [{ model: Player }],
      });
  
      const teams = teamsData.map(team => team.get({ plain: true }));
  
      res.render('homepage', { teams });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  
  // GET /players/:id - Show details for a specific player
  router.get('/players/:id', async (req, res) => {
    try {
      const playerData = await Player.findByPk(req.params.id, {
        include: [{ model: Team }],
      });
  
      if (!playerData) {
        res.status(404).json({ message: 'No player found with this id!' });
        return;
      }
  
      const player = playerData.get({ plain: true });
  
      res.render('player', { player });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  
  // GET /players/new - Show a form to create a new player
  router.get('/players/new', (req, res) => {
    res.render('new-player');
  });
  