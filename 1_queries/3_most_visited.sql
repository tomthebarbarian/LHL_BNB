SELECT city, COUNT(*)
FROM properties
JOIN reservations ON reservations.property_id = properties.id 
GROUP BY properties.city
ORDER BY COUNT(*) DESC;
