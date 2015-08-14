var Imag = React.createClass({
    render: function(){
        return(
            <div className="imag">
                <h2 className="title">{this.props.title}</h2>
                <p>{this.props.link}</p>
            </div>
        )
    }
});
var ImageList = React.createClass({
    render: function(){
        // var imageNodes = this.props.data.map(function (img) {
        //     return(
        //         <Imag title={img.title} link={img.link} />
        //     );
        // });
        
        var parsedData = JSON.parse(this.props.data);

        return(
            <div className="imageList">
                {parsedData}
            </div>
        )
    }
});

var Imgur = React.createClass({
    loadImagesFromApi: function(){
        $.ajax({
            url: this.props.url,
            dataType:'json',
            cache:false,
            headers: {
                Authorization: 'Client-ID 4eef1cf7923222d',
                Accept: 'application/json'
            },
            success: function(data){
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    },
    getInitialState: function(){
        return{data:[]};
    },
    componentDidMount: function(){
        this.loadImagesFromApi();
    },
    render: function(){
        return(
            <div className="imgur">
                <ImageList data={this.state.data} />
            </div>
        )
    }
});
React.render(
    <Imgur url="https://api.imgur.com/3/gallery/hot/viral/0.json" />,
    document.getElementById('content')
);