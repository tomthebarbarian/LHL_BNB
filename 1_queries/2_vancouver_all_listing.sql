SELECT properties.id,properties.title, properties.cost_per_night, AVG(property_reviews.rating)
FROM properties
JOIN property_reviews ON property_reviews.property_id = properties.id 
WHERE properties.city like '%ancouv%' 
GROUP BY properties.id,properties.title, properties.cost_per_night
HAVING AVG(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;