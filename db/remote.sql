-- Créer la table healths
CREATE TABLE healths (
    id SERIAL PRIMARY KEY,
    device_type VARCHAR(255) NOT NULL,
    data VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insérer des données initiales dans la table healths
INSERT INTO healths (device_type, data, created_at, updated_at) VALUES 
('Fitbit', 'Steps: 10000', NOW(), NOW()),
('Apple Watch', 'Heart Rate: 70', NOW(), NOW());
