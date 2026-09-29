import { askGroq } from "../services/groqService.js";

export async function generateRoadmap(req, res) {

    try {

        const student = req.body;

        const prompt = `
You are an AI Career Counselor.

Analyze this student.

${JSON.stringify(student)}

Return only JSON.
`;

        const result = await askGroq(prompt);

        res.json({
            success: true,
            data: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}
