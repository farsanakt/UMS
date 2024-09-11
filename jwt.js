import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()




const generateToken = (payload) => {
    try {
        console.log('Generating token with payload:', payload);
        const token = jwt.sign(
            { payload },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log('Generated token:', token);
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw error;
    }
};

export default generateToken;
