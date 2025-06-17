import { ObjectId } from 'mongodb';

export function validateResearch(body) {
  const { title, category, region, description, date, image } = body;
  const pie = body.charts?.pie || body.pie;
  const bar = body.charts?.bar || body.bar;

  if (!title || !category || !region || !description || !date || !image) {
    return 'Missing required fields';
  }
  if (!Array.isArray(pie) || !Array.isArray(bar)) {
    return 'Invalid charts data';
  }
  return null;
}

export function createResearchDoc(body, userId) {
  const { title, category, region, description, date, image } = body;
  const pie = body.charts?.pie || body.pie;
  const bar = body.charts?.bar || body.bar;

  const charts = [];

  if (Array.isArray(pie) && pie.length) {
    charts.push({
      type: 'pie',
      title: 'Графік pie',
      data: pie,
    });
  }

  if (Array.isArray(bar) && bar.length) {
    charts.push({
      type: 'bar',
      title: 'Графік bar',
      data: bar,
    });
  }

  return {
    title,
    category,
    region,
    description,
    date,
    image,
    charts,
    views: 0,
    createdBy: new ObjectId(userId),
  };
}
