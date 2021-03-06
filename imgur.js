var Imag = React.createClass({
    render: function(){
        return(
            <div className="imag">
                <h2 className="title">{this.props.id} - {this.props.title}</h2>
                <a target="_blank" href={this.props.link}>{this.props.link}</a>
            </div>
        )
    }
});
var ImageList = React.createClass({
    render: function(){
        var imageNodes = this.props.data.map(function (img) {
            return(
                <Imag title={img.title} link={img.link} id={img.id} />
            );
        });
        
        return(
            <div className="imageList">
                {imageNodes}
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
                this.setState({data: data.data});
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