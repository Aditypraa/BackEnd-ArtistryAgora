const { UnauthenticatedError, UnauthorizedError } = require('../errors');
const { isTokenValid } = require('../utils/jwt');

// User Ini adalah CMS yang terdiri dari OWNER, ORGANIZER DAN ADMIN
const authenticatedUser = async (req, res, next) => {
  try {
    let token;

    // check Header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError('Authentication invalid');
    }

    const payload = isTokenValid({ token });

    // Melampirkan pengguna dan izinnya ke objek permintaan
    req.user = {
      id: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      organizer: payload.organizer,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authenticatedParticipant = async (req, res, next) => {
  try {
    let token;

    // check Header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError('Authentication invalid');
    }

    const payload = isTokenValid({ token });

    // Melampirkan pengguna dan izinnya ke objek permintaan
    req.participant = {
      id: payload.participantId,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) throw new UnauthorizedError(`Unauthorized to access this route`);

    next();
  };
};

module.exports = { authenticatedUser, authenticatedParticipant, authorizeRoles };
