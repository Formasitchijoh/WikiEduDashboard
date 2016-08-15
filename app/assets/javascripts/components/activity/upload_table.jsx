import React from 'react';
import Loading from '../common/loading.jsx';
import Upload from '../uploads/upload.jsx';

const UploadTable = React.createClass({
  displayName: 'UploadTable',

  propTypes: {
    loading: React.PropTypes.bool,
    uploads: React.PropTypes.array,
    headers: React.PropTypes.array
  },

  getInitialState() {
    return {
      uploads: this.props.uploads
    };
  },

  _renderUploads() {
    return this.state.uploads.map((upload) => {
      return (
        <Upload upload={upload} key={upload.id} />
      );
    });
  },

  _renderHeaders() {
    return this.props.headers.map((header) => {
      return (
        <th key={header.key} style={header.style || {}}>
          {header.title}
        </th>
      );
    });
  },

  render() {
    if (this.props.loading) {
      return <Loading />;
    }

    const uploads = this._renderUploads();
    const ths = this._renderHeaders();

    return (
      <table className="uploads table">
        <thead>
          <tr>
            {ths}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {uploads}
        </tbody>
      </table>
    );
  }
});

export default UploadTable;
