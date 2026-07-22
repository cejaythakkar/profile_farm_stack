import { useState } from 'react';
import PageUnderConstruction from '../../components/PageUnderConstruction';
import { Modal } from 'shared-component-library';
import { DataGrid } from '@mui/x-data-grid';
import GridStyles from './GridStyle';
import { FaCross } from 'react-icons/fa';
import { FormComponents } from 'shared-component-library';

const projects = [
  {
    id: 'proj_01',
    title: 'Catalyst Console',
    domain: [
      'Marketing Automation',
      'Store Management',
      'IoT & Location Services',
    ],
    technology: ['React.js', 'Redux', 'Node.js', 'MySQL', 'Docker'],
    role: 'Full Stack Developer',
    responsibilities: [
      'Gathered and analyzed system requirements to map marketing flows to legacy core infrastructure.',
      'Developed modular dashboard interfaces for campaign configuration, segment targeting, and beacon telemetry management.',
      'Integrated real-time streaming data pipelines compatible with enterprise data warehouses and legacy mainframe architecture.',
      'Authored robust unit tests across backend services and front-end state machinery to ensure high pipeline reliability.',
    ],
    projectBrief:
      'A high-throughput centralized console designed to orchestrate real-time marketing campaigns, dispatch network-level proximity offers, and manage hardware beacon topologies. Built with direct compatibility for streaming data nodes, legacy data warehouses, and mainframe ecosystems.',
  },
  {
    id: 'proj_02',
    title: 'OmniStore Inventory Engine',
    domain: ['E-Commerce', 'Store Management', 'Logistics'],
    technology: ['React.js', 'Redux', 'Node.js', 'MySQL', 'Docker', 'Redis'],
    role: 'Full Stack Developer',
    responsibilities: [
      'Engineered a dynamic, multi-warehouse stock reconciliation module to handle real-time inventory updates across distributed retail outlets.',
      'Designed an optimized transactional MySQL database schema utilizing row-level locks to completely mitigate race conditions during high-volume sales windows.',
      'Implemented full state caching layers via Redux Toolkit to maintain seamless UI responsiveness across offline-first warehouse client machines.',
    ],
    projectBrief:
      'A mission-critical store management software engine designed to manage localized inventories, track real-time stock-keeping units (SKUs) across physical storefronts, and automate global restock alerts via localized service networks.',
  },
  {
    id: 'proj_03',
    title: 'BeaconPulse Analytics Platform',
    domain: ['Proximity Marketing', 'IoT Analytics', 'Big Data'],
    technology: [
      'React.js',
      'Context API',
      'Node.js',
      'MySQL',
      'Docker',
      'WebSockets',
    ],
    role: 'Backend & Integration Lead',
    responsibilities: [
      'Architected a streaming WebSocket layer in Node.js capable of ingesting thousands of spatial pings per second from in-store micro-beacons.',
      'Created highly interactive canvas-based heatmap charts in React to visualize user dwell-times and customer journey pathways inside retail zones.',
      'Containerized microservices using Docker to ensure seamless vertical scaling on cloud environments during peak promotional seasons.',
    ],
    projectBrief:
      'An IoT-focused analytics dashboard tracking real-time user proximity data. It maps hardware beacon streams to virtual user segments, helping physical businesses dynamically adjust display ads and evaluate store traffic performance metrics.',
  },
  {
    id: 'proj_04',
    title: 'SegmentX User Target Engine',
    domain: ['Marketing Tech', 'Customer Data Platform (CDP)'],
    technology: ['React.js', 'Redux', 'Node.js', 'MySQL', 'Docker'],
    role: 'Front End Developer',
    responsibilities: [
      'Built an intricate query-builder interface in React allowing non-technical marketing users to generate compound demographic or behavioral segmentation rules.',
      'Optimized query generation logic on the Node.js layer to swiftly fetch filtered profiles out of multi-million row relational tables in MySQL.',
      'Conducted extensive user acceptance testing (UAT) and interface unit testing to isolate behavioral edge cases in complex filtering matrices.',
    ],
    projectBrief:
      'A behavioral categorization and segmentation engine that pools user demographic and transactional histories together, allowing marketers to target highly specific consumer groups for push notifications and automated direct-mail channels.',
  },
  {
    id: 'proj_05',
    title: 'Nexus Stream Gateway',
    domain: ['DevOps', 'Legacy Infrastructure', 'Enterprise Integration'],
    technology: ['Node.js', 'MySQL', 'Docker', 'Apache Kafka'],
    role: 'Backend Engineer',
    responsibilities: [
      'Developed translation layers to convert incoming structured data packet formats from legacy mainframe streams into standard JSON structures.',
      'Established secure database access layers in MySQL configured specifically to prevent downstream bottlenecks during high-capacity server logging actions.',
      'Configured multi-container Docker Compose environments to cleanly replicate physical enterprise network topologies for locally controlled unit testing.',
    ],
    projectBrief:
      'An integration middleware solution functioning as a bridge between modern cloud web apps and strict on-premise hardware nodes. It ensures data fluidity from point to point across distinct generations of enterprise server infrastructure.',
  },
];

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelTitle, setModalTitle] = useState('');
  const handleViewClick = (rowData, name) => {
    
    switch (name) {
      case 'view':
        setModalTitle('View Project');
        break;
      case 'update':
        setModalTitle('Update Project');
        break;
      case 'delete':
        setModalTitle('Delete Project');
        break;
    }
    setIsModalOpen(true);
    
  };

  const columns = [
    { field: 'title', headerName: 'TITLE', width: 250 },
    {
      field: 'domain',
      headerName: 'Domain',
      width: 400,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const techArray = params.value || [];
        return (
          <div className="flex flex-wrap w-full items-center gap-1 p-1">
            {techArray.map((tech, index) => (
              <div
                key={index}
                className="flex items-center h-[25px] text-sm box-border p-1 rounded-3xl bg-gray-700 border border-gray-500"
              >
                {tech}
              </div>
            ))}
          </div>
        );
      },
    },
    { field: 'role', headerName: 'ROLE', width: 200 },
    {
      field: 'technology',
      headerName: 'TECHNOLOGY',
      width: 300,
      renderCell: (params) => {
        const techArray = params.value || [];
        return (
          <div className="flex flex-wrap w-full items-center gap-1 p-1">
            {techArray.map((tech, index) => (
              <div
                key={index}
                className="flex items-center h-[25px] text-sm box-border p-1 rounded-3xl bg-gray-700 border border-gray-500"
              >
                {tech}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      field: 'view',
      headerName: 'VIEW',
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <FormComponents.Button
            text={'view'}
            color="green"
            name="view"
            iconName="view"
            clickHandler={(e) => {
              
              handleViewClick(params.row, e.target.name);
            }}
          />
        );
      },
    },
    {
      field: 'update',
      headerName: 'UPDATE',
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <FormComponents.Button
            text={'update'}
            color="blue"
            name="update"
            iconName="edit"
            clickHandler={(e) => {
              handleViewClick(params.row, e.target.name);
            }}
          />
        );
      },
    },
    {
      field: 'delete',
      headerName: 'DELETE',
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <FormComponents.Button
            text={'delete'}
            color="red"
            name="delete"
            iconName="delete"
            clickHandler={(event) => {
              handleViewClick(params.row, event.currentTarget.name);
            }}
          />
        );
      },
    },
  ];
  return (
    <div className="projects-container py-5 w-full overflow-x-auto">
      <div className="projects-list-wrapper flex-col">
        <DataGrid
          rows={projects}
          columns={columns}
          pageSizeOptions={[5]}
          rowHeight={70}
          sx={GridStyles}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        title={modelTitle}
        setIsOpen={setIsModalOpen}
      ></Modal>
    </div>
  );
};

export default ProjectsPage;
