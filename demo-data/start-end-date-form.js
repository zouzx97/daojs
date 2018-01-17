// import { Form, DatePicker } from 'antd';

export default function App() {
  return (
    <Form layout="horizontal">
      <Form.Item label="Start date">
        <DatePicker />
      </Form.Item>
      <Form.Item label="End date">
        <DatePicker />
      </Form.Item>
    </Form>
  );
}
